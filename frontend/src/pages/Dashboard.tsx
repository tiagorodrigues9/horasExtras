import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { api } from '../services/api';

interface Estatisticas {
  totalAtendimentos: number;
  totalHoras: number;
  mediaHoras: number;
  clienteFrequente: string;
  grafico: Array<{ data: string; count: number }>;
  atendimentos: Array<{
    _id: string;
    cliente: { nome: string };
    inicio: string;
    fim?: string;
    duracao?: number;
    observacao?: string;
  }>;
}

export const Dashboard: React.FC = () => {
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Definir datas padrão (última semana)
    const hoje = new Date();
    const umaSemanaAtras = new Date(hoje);
    umaSemanaAtras.setDate(hoje.getDate() - 7);
    
    setDataFim(hoje.toISOString().split('T')[0]);
    setDataInicio(umaSemanaAtras.toISOString().split('T')[0]);
    
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (dataInicio) params.append('inicio', dataInicio);
      if (dataFim) params.append('fim', dataFim);

      const response = await api.get(`/atendimentos/estatisticas?${params}`);
      setEstatisticas(response.data);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Erro ao carregar estatísticas');
    } finally {
      setLoading(false);
    }
  };

  const formatarHoras = (milissegundos: number) => {
    if (!milissegundos || milissegundos === 0) return "00:00:00";
    
    let segundos;
    if (milissegundos > 1000) {
      segundos = Math.floor(milissegundos / 1000);
    } else {
      segundos = milissegundos;
    }
    
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Estatísticas dos seus atendimentos
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Filtros */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Filtros
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <TextField
              label="Data Inicial"
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              label="Data Final"
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            
            <Button variant="contained" onClick={carregarEstatisticas}>
              Filtrar
            </Button>
          </Box>
        </CardContent>
      </Card>

      {estatisticas && (
        <>
          {/* Estatísticas */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Atendimentos
                  </Typography>
                  <Typography variant="h4">
                    {estatisticas.totalAtendimentos}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Total de Horas
                  </Typography>
                  <Typography variant="h4">
                    {formatarHoras(estatisticas.totalHoras)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Média por Atendimento
                  </Typography>
                  <Typography variant="h4">
                    {formatarHoras(estatisticas.mediaHoras)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Cliente Mais Atendido
                  </Typography>
                  <Typography variant="h6">
                    {estatisticas.clienteFrequente || '-'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Gráfico */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Atendimentos por Dia
              </Typography>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={estatisticas.grafico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Lista de Atendimentos */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Últimos Atendimentos
              </Typography>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Início</TableCell>
                      <TableCell>Fim</TableCell>
                      <TableCell>Duração</TableCell>
                      <TableCell>Observação</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {estatisticas.atendimentos.map((atendimento) => (
                      <TableRow key={atendimento._id}>
                        <TableCell>{atendimento.cliente.nome}</TableCell>
                        <TableCell>
                          {new Date(atendimento.inicio).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {atendimento.fim 
                            ? new Date(atendimento.fim).toLocaleString()
                            : 'Em andamento'
                          }
                        </TableCell>
                        <TableCell>
                          {atendimento.duracao 
                            ? formatarHoras(atendimento.duracao)
                            : '-'
                          }
                        </TableCell>
                        <TableCell>
                          {atendimento.observacao || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};
