import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Avatar,
  IconButton
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export const Perfil: React.FC = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome,
        email: user.email
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nome', formData.nome);
      
      // Aqui você pode adicionar upload de foto se necessário
      // const fotoInput = document.getElementById('foto') as HTMLInputElement;
      // if (fotoInput?.files?.[0]) {
      //   formDataToSend.append('foto', fotoInput.files[0]);
      // }

      await api.put('/auth/perfil', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSuccess('Perfil atualizado com sucesso!');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Meu Perfil
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Gerencie suas informações pessoais
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar
              sx={{ width: 120, height: 120, mb: 2 }}
              src={user?.foto}
            >
              {user?.nome?.charAt(0).toUpperCase()}
            </Avatar>
            
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="foto"
              type="file"
            />
            <label htmlFor="foto">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="name"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
            
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formData.email}
              disabled
              helperText="Email não pode ser alterado"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Atualizar Perfil'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
