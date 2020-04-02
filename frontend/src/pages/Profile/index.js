import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { useAlert } from 'react-alert';

import api from '../../services/api';
import { deauthenticate, getAuthenticationData } from '../../auth';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const [ongId, ongName, authToken] = getAuthenticationData();
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    api.get('profile', {
      headers: { Authorization: `Bearer ${authToken}` },
    }).then((response) => {
      setIncidents(response.data);
    });
  }, [ongId, authToken]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (err) {
      alert.error('Erro ao deletar caso, tente novamente mais tarde.');
    }
  }

  function handleLogout() {
    deauthenticate();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>
          Bem-vinda,
          {' '}
          { ongName }
        </span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {
            incidents.map((incident) => (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{ incident.title }</p>

                <strong>DESCRIÇÃO:</strong>
                <p>{ incident.description }</p>

                <strong>VALOR:</strong>
                <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>

                <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                  <FiTrash2 size={20} color="#A8A8B3" />
                </button>
              </li>
            ))
        }
      </ul>
    </div>
  );
}
