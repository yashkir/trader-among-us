import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../../components/Column/Column";
import itemsApi from "../../utils/items-api";
import { getUser } from "../../utils/users-service";
import "./ItemDrag.css";

const data = {
  items: {
    "itm-1": {
      id: "itm-1",
      name: "item1",
      description: "somedes",
      img: "https://cdn.greatlifepublishing.net/wp-content/uploads/sites/4/2015/10/23150611/coffee-grinder-715170_960_720.jpg"
    },
    "itm-2": {
      id: "itm-2",
      name: "item2",
      description: "somedes",
      img: "https://wl-brightside.cf.tsp.li/resize/728x/jpg/181/4fb/2a0b6e52e29e3ba58697034db7.jpg"
    },
    "itm-3": {
      id: "itm-3",
      name: "item3",
      description: "somedes",
      img: "https://thumbs.dreamstime.com/b/kitchen-antique-items-rural-life-composition-objects-dark-background-194158844.jpg"
    },
  },
  columns: {
    "col-1": {
      id: "col-1",
      title: "Your Items",
      itemIds: []
    },
    "col-2": {
      id: "col-2",
      title: "Post Items",
      itemIds: [],
    },
  },
  columnOrder: ["col-1", "col-2"],
};

export default function ItemDrag({ setItemsOffered }) {
  const user = getUser();
  const userId = user._id;

  const loadItems = async () => {
    const res = await itemsApi.show(userId);
    const itemsForDrag = res.item;
    let itemIds = itemsForDrag.map(item => item._id);
    data.columns["col-1"].itemIds = itemIds;
    itemsForDrag.forEach(item => {
      data.items[item._id] = {
        id: item._id,
        name: item.title,
        img: item.image,
      };     
    });
    
    setItems({...data});
    
  };

  const [items, setItems] = useState(data);
  const columns = items.columnOrder;

  useEffect(() => {
    loadItems();
    
  }, []);

  useEffect(() => {
    const itemsoffered = items.columns["col-2"].itemIds;
    setItemsOffered(itemsoffered);
  }, [items]);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = items.columns[source.droppableId];
    const end = items.columns[destination.droppableId];

    if (start === end) {
      const newItemIds = Array.from(start.itemIds);

      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newStartColumn = {
        ...start,
        itemIds: newItemIds,
      };

      const newState = {
        ...items,
        columns: {
          ...items.columns,
          [newStartColumn.id]: newStartColumn,
        }
      };

      setItems(newState);
      return;
    }

    //Moving to different column
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart = {
      ...start,
      itemIds: startItemIds,
    };

    const endItemIds = Array.from(end.itemIds);
    endItemIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      itemIds: endItemIds,
    };

    const newState = {
      ...items,
      columns: {
        ...items.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd,
      }
    };
    setItems(newState);
    

  };

  return (
    <div>
      <DragDropContext  onDragEnd={onDragEnd}>
            {columns.map((colId) => {
              const column = items.columns[colId];
              const res = column.itemIds.map(itemId => items.items[itemId]);
              return (<div className="Bid-list"><Column key={column.id} column={column} res={res} /></div>);
            })}
          </DragDropContext>
    </div>
  );
}
