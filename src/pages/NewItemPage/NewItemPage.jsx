import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import ItemCreateForm from "../../components/ItemCreateForm/ItemCreateForm";

export default function NewItemPage() {
    return (
        <div>
            <PageTitle titleOne={"NEW"} titleTwo={"ITEM"} />
            <ItemCreateForm />
        </div>
    );
}
