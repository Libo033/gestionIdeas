import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormEvent } from "react";

export const handleCreateItem = async (
  Event: FormEvent,
  router: AppRouterInstance,
  idKanban: string
) => {
  try {
    Event.preventDefault();

    let item = (document.getElementById("item_handler_text") as HTMLInputElement).value;

    const response = await fetch(`/api/kanban/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idKanban,
        item,
      }),
    });

    const result: Response = await response.json();

    console.log(result);

    if (result) {
      router.push(`/home/kanban/${idKanban}`);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const handleMoveItemTo = async (
  idKanban: string,
  idItem: string,
  moveTo: "to do" | "doing" | "done"
) => {
  try {
    await fetch(`/api/kanban/items`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idKanban,
        idItem,
        moveTo,
      }),
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const handleEditItem = async (
  Event: FormEvent,
  router: AppRouterInstance,
  idKanban: string,
  idItem: string,
  item: string,
  status: "to do" | "doing" | "done"
) => {
  try {
    Event.preventDefault();

    const response = await fetch(`/api/kanban/items`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idKanban,
        idItem,
        item,
        status,
      }),
    });

    const result: Response = await response.json();

    if (result) {
      router.push(`/home/kanban/${idKanban}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
