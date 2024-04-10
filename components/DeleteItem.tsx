'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function DeleteItem({
  item,
  handleDelete,
}: {
  item: { id: string }
  handleDelete: (id: string) => Promise<void>
}) {
  const router = useRouter()
  return (
    <button
      type="button"
      className="text-sm font-semibold text-red-600 mt-2"
      onClick={async () => {
        await handleDelete(item.id)
        router.refresh()
      }}
    >
      <TrashIcon className="w-4 h-4" />
      <span className="sr-only">Delete</span>
    </button>
  )
}
