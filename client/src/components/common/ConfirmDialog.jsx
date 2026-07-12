import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { FaExclamationTriangle, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone. Please confirm to proceed.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  type = 'warning' // warning, danger, info
}) {
  const icons = {
    danger: <FaExclamationTriangle className="text-3xl text-red-500" />,
    warning: <FaExclamationTriangle className="text-3xl text-amber-500" />,
    info: <FaInfoCircle className="text-3xl text-blue-500" />
  };

  const confirmVariants = {
    danger: 'danger',
    warning: 'primary', // fallback to primary action
    info: 'primary'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" closeOnOutsideClick={!isLoading}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {icons[type] || <FaQuestionCircle className="text-3xl text-slate-500" />}
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed mb-6">
            {message}
          </p>
          
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              isDisabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              variant={confirmVariants[type] || 'primary'}
              size="sm"
              isLoading={isLoading}
              onClick={async () => {
                await onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
