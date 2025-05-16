import React, { useMemo, useState, useRef } from 'react';

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\.<>?/`~";

const RegistrationForm = () => {
  // Campi controllati
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    descrizione: ''
  });

  const [error, setError] = useState('');

  // Campi non controllati con useRef
  const nomeCompletoRef = useRef();
  const anniEsperienzaRef = useRef();
  const specializzazioneRef = useRef();

  // Validazioni live solo per i campi controllati
  const usernameValid = useMemo(() => {
    const { username } = formData;
    const charactersValid = username.split("").every(char => letters.includes(char.toLowerCase()));
    return charactersValid && username.trim().length >= 6;
  }, [formData.username]);

  const passwordValid = useMemo(() => {
    const { password } = formData;
    return (
      password.trim().length >= 8 &&
      password.split("").some(char => letters.includes(char)) &&
      password.split("").some(char => numbers.includes(char)) &&
      password.split("").some(char => symbols.includes(char))
    );
  }, [formData.password]);

  const descrizioneValid = useMemo(() => {
    const { descrizione } = formData;
    return descrizione.trim().length >= 100 && descrizione.trim().length < 1000;
  }, [formData.descrizione]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Leggiamo i valori dei ref
    const nomeCompleto = nomeCompletoRef.current.value;
    const anniEsperienza = anniEsperienzaRef.current.value;
    const specializzazione = specializzazioneRef.current.value;

    const { username, password, descrizione } = formData;

    if (
      !nomeCompleto.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specializzazione ||
      !anniEsperienza ||
      !descrizione.trim() ||
      !usernameValid ||
      !passwordValid ||
      !descrizioneValid
    ) {
      setError('Tutti i campi devono essere compilati.');
      return false;
    }

    const anni = Number(anniEsperienza);
    if (isNaN(anni) || anni <= 0) {
      setError('Gli anni di esperienza devono essere un numero positivo.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Componiamo i dati completi, usando sia useState che useRef
      const fullData = {
        nomeCompleto: nomeCompletoRef.current.value,
        username: formData.username,
        password: formData.password,
        specializzazione: specializzazioneRef.current.value,
        anniEsperienza: anniEsperienzaRef.current.value,
        descrizione: formData.descrizione
      };

      console.log('Dati del form:', fullData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome Completo:</label>
        <input
          type="text"
          name="nomeCompleto"
          ref={nomeCompletoRef}
        />
      </div>

      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {formData.username.trim() && (
          <p style={{ color: usernameValid ? 'green' : 'red' }}>
            {usernameValid ? "username valido" : "deve avere solo lettere e almeno 6 caratteri"}
          </p>
        )}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {formData.password.trim() && (
          <p style={{ color: passwordValid ? 'green' : 'red' }}>
            {passwordValid ? "password valida" : "min 8 caratteri, lettere, numeri e simboli"}
          </p>
        )}
      </div>

      <div>
        <label>Specializzazione:</label>
        <select
          name="specializzazione"
          ref={specializzazioneRef}
        >
          <option value="">-- Seleziona --</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
      </div>

      <div>
        <label>Anni di esperienza:</label>
        <input
          type="number"
          name="anniEsperienza"
          ref={anniEsperienzaRef}
        />
      </div>

      <div>
        <label>Breve descrizione:</label>
        <textarea
          name="descrizione"
          value={formData.descrizione}
          onChange={handleChange}
        ></textarea>
        {formData.descrizione.trim() && (
          <p style={{ color: descrizioneValid ? 'green' : 'red' }}>
            {descrizioneValid
              ? "descrizione valida"
              : "deve contenere almeno 100 caratteri e meno di 1000"}
          </p>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Registrati</button>
    </form>
  );
};

export default RegistrationForm;
