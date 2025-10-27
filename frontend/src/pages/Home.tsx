import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Cliente {
  _id: string;
  nome: string;
  cnpj: string;
}

interface Atendimento {
  _id: string;
  cliente: Cliente;
  inicio: string;
  fim?: string;
}

export const Home: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [atendimentoParaFinalizar, setAtendimentoParaFinalizar] = useState<string | null>(null);
  const [observacao, setObservacao] = useState('');
  const [currentTime, setCurrentTime] = useState(Date.now());
  const { user } = useAuth();

  useEffect(() => {
    carregarClientes();
    carregarAtendimentos();
  }, []);

  // Atualizar cronômetro a cada segundo
  useEffect(() => {
    if (atendimentos.length > 0) {
      const interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [atendimentos]);

  const carregarClientes = async () => {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  const carregarAtendimentos = async () => {
    try {
      const response = await api.get('/atendimentos');
      setAtendimentos(response.data);
    } catch (error) {
      console.error('Erro ao carregar atendimentos:', error);
    }
  };

  const iniciarAtendimento = async () => {
    if (!clienteSelecionado) {
      setError('Selecione um cliente');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/atendimentos/iniciar', { clienteId: clienteSelecionado });
      setSuccess('Atendimento iniciado com sucesso!');
      setClienteSelecionado('');
      carregarAtendimentos();
    } catch (error: any) {
      setError(error.response?.data?.error || 'Erro ao iniciar atendimento');
    } finally {
      setLoading(false);
    }
  };

  const abrirDialogFinalizacao = (atendimentoId: string) => {
    setAtendimentoParaFinalizar(atendimentoId);
    setObservacao('');
    setOpenDialog(true);
  };

  const fecharDialogFinalizacao = () => {
    setOpenDialog(false);
    setAtendimentoParaFinalizar(null);
    setObservacao('');
  };

  const finalizarAtendimento = async () => {
    if (!atendimentoParaFinalizar) return;

    setLoading(true);
    setError('');

    try {
      await api.put(`/atendimentos/finalizar/${atendimentoParaFinalizar}`, {
        observacao: observacao
      });
      setSuccess('Atendimento finalizado com sucesso!');
      carregarAtendimentos();
      fecharDialogFinalizacao();
    } catch (error: any) {
      setError(error.response?.data?.error || 'Erro ao finalizar atendimento');
    } finally {
      setLoading(false);
    }
  };

  const formatarTempo = (inicio: string) => {
    const inicioDate = new Date(inicio);
    const diff = currentTime - inicioDate.getTime();
    
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {user?.nome}!
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Gerencie seus atendimentos e clientes
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

      {/* Novo Atendimento */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Iniciar Novo Atendimento
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { xs: 'stretch', sm: 'center' }, mb: 2 }}>
            <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={clienteSelecionado}
                onChange={(e) => setClienteSelecionado(e.target.value)}
                label="Cliente"
              >
                {clientes.map((cliente) => (
                  <MenuItem key={cliente._id} value={cliente._id}>
                    {cliente.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button
              variant="contained"
              onClick={iniciarAtendimento}
              disabled={loading || !clienteSelecionado}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Iniciar Atendimento
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Atendimentos em Aberto */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Atendimentos em Aberto
          </Typography>
          
          {atendimentos.length === 0 ? (
            <Typography color="text.secondary">
              Nenhum atendimento em aberto
            </Typography>
          ) : (
            <List>
              {atendimentos.map((atendimento) => (
                <ListItem key={atendimento._id} divider>
                  <ListItemText
                    primary={atendimento.cliente.nome}
                    secondary={`Iniciado em: ${new Date(atendimento.inicio).toLocaleString()}`}
                  />
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={formatarTempo(atendimento.inicio)}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => abrirDialogFinalizacao(atendimento._id)}
                      disabled={loading}
                      fullWidth={false}
                    >
                      Finalizar
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Dialog de finalização */}
      <Dialog open={openDialog} onClose={fecharDialogFinalizacao} maxWidth="sm" fullWidth>
        <DialogTitle>Finalizar Atendimento</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Observação"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Digite uma observação sobre o atendimento (opcional)"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharDialogFinalizacao} disabled={loading}>
            Cancelar
          </Button>
          <Button 
            onClick={finalizarAtendimento} 
            variant="contained" 
            color="error"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Finalizar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
