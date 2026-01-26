import React from 'react'

const ConfirmationOnly = ({title ,message,confirmText,cancelText,onConfirm,onCancel}) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-100 flex items-end">
       <div className="bg-white w-full rounded-t-2xl p-4 space-y-4">
        <h3 className="text-lg font-semibold text-[#21c4cc]">
          {title}
        </h3>

        {/* SUMMARY */}
        <div className="text-sm space-y-1">
          <p>{message}</p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="w-1/3 border border-gray-300 py-3 rounded-xl"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="w-2/3 bg-[#21c4cc] text-white py-3 rounded-xl font-medium"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationOnly
