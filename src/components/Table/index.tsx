import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";
import { useState } from "react";
import { FormModal } from "../FormModal";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal";
import { useTransaction } from "@/hooks/useTransaction";

export interface ITableProps {
  data: ITransaction[];
}

export function Table({ data }: ITableProps) {
  const { Update, Delete } = useTransaction;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);

  const openEditModal = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateTransaction = async (updatedTransaction: ITransaction) => {
    try {
      await Update().mutateAsync(updatedTransaction);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
    }
  };

  const handleDeleteTransaction = async () => {
    try {
      if (selectedTransaction) {
        await Delete().mutateAsync(selectedTransaction.id);
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  };

  return (
    <>
      <table className="w-full mt-16 border border-separate border-spacing-y-2 ">
        <thead>
          <tr>
            <th className="px-4 text-left text-table-header text-base font-medium">Título</th>
            <th className="px-4 text-left text-table-header text-base font-medium">Preço</th>
            <th className="px-4 text-left text-table-header text-base font-medium">Categoria</th>
            <th className="px-4 text-left text-table-header text-base font-medium">Data</th>
            <th className="px-4 text-left text-table-header text-base font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white h-16 rounded-lg">
              <td className="px-4 py-4 whitespace-nowrap text-title">{item.title}</td>
              <td className={`px-4 py-4 whitespace-nowrap text-right ${item.type === 'income' ? "text-income-value" : "text-outcome"}`}>{formatCurrency(item.price)}</td>
              <td className="px-4 py-4 whitespace-nowrap">{item.category}</td>
              <td className="px-4 py-4 whitespace-nowrap">{item.data ? formatDate(new Date(item.data)) : ''}</td>
              <td className="px-4 py-4 whitespace-nowrap">
                <button
                  className="text-blue-600 hover:underline mr-4"
                  onClick={() => openEditModal(item)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => openDeleteModal(item)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar transação */}
      {isEditModalOpen && selectedTransaction && (
        <FormModal
          formTitle="Editar Transação"
          closeModal={() => setIsEditModalOpen(false)}
          AddTransaction={handleUpdateTransaction}
          transaction={selectedTransaction}
        />
      )}

      {/* Modal para confirmar exclusão */}
      {isDeleteModalOpen && selectedTransaction && (
        <DeleteConfirmationModal
          title="Confirmar Exclusão"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteTransaction}
        />
      )}
    </>
  );
}
