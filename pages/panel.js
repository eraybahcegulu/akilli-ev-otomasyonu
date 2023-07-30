import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { addHomeDataFirebase, listenHomeDataFirebase } from "../firebase/utils";
import { getAuth, signOut } from "firebase/auth";
import Column from "../components/Column";
import NewColumnInput from "../components/NewColumnInput";
import { DragDropContext } from "react-beautiful-dnd";
import { Toaster } from "react-hot-toast";
import { uuid } from "uuidv4";

export default function Panel() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, setState] = useState();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      listenHomeDataFirebase(user.uid, setState, setIsLoaded);
      router.push("/panel");
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!isLoaded) {
      return;
    }

    addHomeDataFirebase(user.uid, state);
  }, [state]);

  const logoutClicked = (event) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start == finish) {
      const newDeviceIds = [...start.deviceIds];
      newDeviceIds.splice(source.index, 1);
      newDeviceIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        deviceIds: newDeviceIds,
      };

      setState({
        ...state,
        columns: { ...state.columns, [newColumn.id]: newColumn },
      });
      return;
    }

    const startDeviceIds = [...start.deviceIds];
    startDeviceIds.splice(source.index, 1);
    const newStart = {
      ...start,
      deviceIds: startDeviceIds,
    };

    const finishDeviceIds = Array.from(finish.deviceIds ?? []);
    finishDeviceIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      deviceIds: finishDeviceIds,
    };

    setState({
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  const handleCreateColumn = (newColumnsName) => {
    const id = uuid();
    const newColumn = {
      id: id,
      title: newColumnsName,
    };
    setState({
      ...state,
      columnOrder: [...state.columnOrder, id],
      columns: {
        ...state.columns,
        [id]: newColumn,
      },
    });
  };

  return user ? (
    isLoaded ? (
      <div className="h-screen bg-gradient-to-r from-gray-200 to-gray-300">
        <Toaster></Toaster>
        <div className="site-container">
          <header className="flex justify-between pt-10">
            <h1 className="text-2xl mb-2">Akıllı Evinize Hoşgeldiniz!</h1>
            <button
              className="inline-block mr-0 align-baseline bg-orange-600 rounded w-12 h-8 text-md text-white hover:underline underline-offset-2"
              href="#"
              onClick={logoutClicked}
            >
              Çıkış
            </button>
          </header>
          <main className="bg-gray-100 rounded-xl">
            <div className="p-5 flex flex-col space-y-5 text-xl">
              <DragDropContext onDragEnd={onDragEnd}>
                {state.columnOrder.map((columnId) => {
                  const column = state.columns[columnId];
                  const devices = column.deviceIds?.map(
                    (deviceId) => state.devices[deviceId]
                  );
                  return (
                    <Column
                      key={columnId}
                      column={column}
                      devices={devices}
                      state={state}
                      setState={setState}
                    />
                  );
                })}
              </DragDropContext>
              <NewColumnInput handleCreateColumn={handleCreateColumn} />
            </div>
          </main>
        </div>
      </div>
    ) : (
      <span>Yükleniyor...</span>
    )
  ) : (
    <span>Giriş yapmak için yönlendiriliyorsunuz...</span>
  );
}
