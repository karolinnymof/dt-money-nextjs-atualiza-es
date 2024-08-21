import { FC } from "react";

export interface DeleteConfirmationModalProps {
  title: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({ title, onClose, onConfirm }) => {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <button
              type="button"
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
              onClick={onClose}
              aria-label="Fechar"
            >
              <span className="text-2xl">&times;</span>
            </button>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h1 className="font-semibold leading-9 text-title text-2xl" id="modal-title">{title}</h1>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-12 py-3 flex sm:flex-row-reverse w-full mb-16">
              <button
                type="button"
                className="mt-3 w-full justify-center rounded-md bg-red-600 text-white px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80 sm:mt-0"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
              <button
                type="button"
                className="mt-3 w-full justify-center rounded-md bg-gray-200 text-gray-600 px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80 sm:mt-0 sm:w-auto"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

