import React from "react";

interface DeleteConfirmationModalProps {
  closeModal: () => void;
  confirmDelete: () => void;
}

export function DeleteConfirmationModal({ closeModal, confirmDelete }: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="text-center">
              <h1 className="font-semibold leading-9 text-title text-2xl">Confirmar Exclusão</h1>
              <p>Tem certeza de que deseja excluir esta transação?</p>
            </div>
          </div>
          <div className="bg-gray-50 px-12 py-3 flex sm:flex-row-reverse w-full">
            <button
              type="button"
              className="mt-3 w-full justify-center rounded-md bg-red-600 text-white px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80"
              onClick={confirmDelete}
            >
              Excluir
            </button>
            <button
              type="button"
              className="mt-3 w-full justify-center rounded-md bg-gray-200 text-black px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
