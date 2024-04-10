import { Item } from "@/dbschema/interfaces";
import createClient from "edgedb";
import DeleteItem from "./DeleteItem";

interface Props {
  items: (Omit<Item, "created_by"> & {
    created_by: {
      name: string;
    };
  })[];
}
const deleteItem = async (id: string) => {
  "use server";
  const client = createClient();
  await client.query("DELETE Item FILTER .id = <uuid>$id", {
    id,
  });
};

export default function Items({ items }: Props) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {items.map((item) => (
        <li key={item.id} className="flex gap-x-4 py-5">
          <div className="flex-auto">
            <div className="flex items-baseline justify-between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </p>
              <p className="flex-none text-xs text-gray-600">
                <time dateTime={item.updated?.toLocaleDateString()}>
                  {item.updated?.toLocaleDateString()}
                </time>
              </p>
            </div>
            <div>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
                Author: {item.created_by.name}
              </p>
              <DeleteItem item={item} handleDelete={deleteItem} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
