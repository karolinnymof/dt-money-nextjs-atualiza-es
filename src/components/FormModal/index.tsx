import { useState, useEffect } from "react";
import { Input } from "../Form/Input";
import { TransactionSwitcher } from "../TransactionSwitcher";
import { ITransaction } from "@/types/transaction";

export interface IFormModalProps {
    formTitle: string;
    closeModal: () => void;
    AddTransaction: (transaction: ITransaction) => void;
    transaction?: ITransaction; // Adicionando o campo opcional para a transação existente
}

export function FormModal({ formTitle, closeModal, AddTransaction, transaction }: IFormModalProps) {
  const [title, setTitle] = useState(transaction?.title || ''); // Usando dados da transação se disponível
  const [price, setPrice] = useState(transaction?.price || 0);
  const [category, setCategory] = useState(transaction?.category || '');
  const [type, setType] = useState<"income"|"outcome">(transaction?.type || 'income');

  const handleAddTransaction = () => {
    AddTransaction({
      title,
      price,
      category,
      type,
      data: transaction?.data || new Date() // Se houver transação, mantém a data
    });
    closeModal();
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"> 
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">     
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <button 
              type="button" 
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600" 
              onClick={closeModal}
              aria-label="Fechar">
              <span className="text-2xl">&times;</span>
            </button>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">            
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h1 className="font-semibold leading-9 text-title text-2xl" id="modal-title">{formTitle}</h1>
                </div>
              </div>
            </div>
            <form className="flex flex-col gap-4 px-12 mt-4 mb-6">
              <Input type="text" placeholder="Nome" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
              <TransactionSwitcher setType={setType} type={type} />
              <Input type="text" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />            
            </form>
            <div className="bg-gray-50 px-12 py-3 flex sm:flex-row-reverse w-full mb-16">          
              <button type="button" className="mt-3 w-full justify-center rounded-md bg-income-value text-white px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80 sm:mt-0" onClick={handleAddTransaction}>Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
