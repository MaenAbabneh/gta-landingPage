'use client'

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-2xl mb-4">Something went wrong!</h2>
      <button 
        onClick={() => reset()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  )
}
