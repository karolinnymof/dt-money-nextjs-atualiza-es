import { ApiTransaction } from '@/app/services/transaction'
import { useMutation, useQuery, useQueryClient } from 'react-query'

// Definindo a chave da query
const QUERY_KEY = 'qkTransaction'

// Função para criar transações
const Create = () => {
  const queryClient = useQueryClient()
  return useMutation(ApiTransaction.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    }
  })
}

// Função para listar todas as transações
const ListAll = () => {
  return useQuery([QUERY_KEY], () => ApiTransaction.listAll())
}

// Função para atualizar uma transação
const Update = () => {
  const queryClient = useQueryClient()
  return useMutation((updatedTransaction: ITransaction) => ApiTransaction.update(updatedTransaction), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    }
  })
}

// Função para remover uma transação (caso você tenha uma implementação específica)
const Remove = () => {
  const queryClient = useQueryClient()
  return useMutation((id: string) => ApiTransaction.remove(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    }
  })
}

// Função para excluir uma transação
const Delete = () => {
  const queryClient = useQueryClient()
  return useMutation((id: string) => ApiTransaction.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    }
  })
}

// Exportando todos os métodos do hook useTransaction
export const useTransaction = {
  Create,
  Update,
  ListAll,
  Remove,
  Delete
}
