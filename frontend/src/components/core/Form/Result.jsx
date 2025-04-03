import React from 'react'

export default function Result({result}) {
  return (
    <dialog id="my_modal_1" className="modal">
  <div className="modal-box flex flex-col gap-5">
    <h3 className="font-bold text-lg text-center">{result?.message}</h3>
    <p className="py-4 font-semibold">{result?.mentalResult}</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
  )
}
