import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { useAlert } from 'react-alert';

import api from '../../services/api';
import { authenticate, deauthenticate } from '../../auth';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  deauthenticate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const alert = useAlert();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id, password });

      authenticate(response);
      history.push('/profile');
    } catch (err) {
      if (err.response.status === 400) {
        alert.show('ID e/ou senha incorretos.');
      } else {
        alert.error('Falha no logon, tente novamente mais tarde.');
      }
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
