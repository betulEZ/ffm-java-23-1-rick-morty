import React, {ChangeEvent,useState,FormEvent} from "react";
import {Character} from "./characters.ts";
import * as yup from 'yup'

const input:Character = {
    id:0,
    name:"",
    status:"",
    species:"",
    type:""
}
// Initial form values
const initialFormValue = {id:0,name: "", status: "", species: "", type: ""}
// Schema for form data validation using Yup
const formDataSchema = yup.object().shape({
    id:yup.number().required('Id is required'),
    name: yup.string().required('Name is required').min(2, "Name needs to be at least 2 characters long."),
    status:yup.string().required('Status is required'),
    species:yup.string().required('species is required'),
    type:yup.string().required('type is required')
});
export default function NewCharacter(){
    // State variables
    const [formData, setFormData] = useState<Character>(initialFormValue);
    const [submittedFormDatas, setSubmittedFormDatas] = useState<Character[]>([]);
    const [error, setError] = useState({});

    function handleChangeId(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.id;
        setFormData({
            ...formData,
            id: 0,
        });
    }

    // Function to handle changes in the 'name' input field
    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFormData({
            ...formData,
            name: value,
        });
    }
    function handleChangeStatus(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFormData({
            ...formData,
            status: value,
        });
    }
    function handleChangeSpecies(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFormData({
            ...formData,
            species: value,
        });
    }
    function handleChangeType(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFormData({
            ...formData,
            type: value,
        });
    }
    // Function to handle form submission
    function handleOnSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        formDataSchema.validate(formData, { abortEarly: false })
            .then(() => {
                setSubmittedFormDatas([...submittedFormDatas, formData]);
                setFormData({ id: 0, name: "", status: '',species: '',type: '' });
                setError({});
            }).catch((validationErrors: yup.ValidationError) => {
            // Validation failed
            const errors = validationErrors.inner.reduce<{ [key: number]: number }>((acc, currentError) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                acc[currentError.path] = currentError.message;
                return acc;
            }, {});
            setError(errors);
        });
        console.log("***")
    }


    return (
        <>
            <h1>add new Chracter</h1>
                <form onSubmit={handleOnSubmit}>
                    <div>
                        <label htmlFor={"id"}>id:</label>
                        <input type={"number"} name={"id"} id={"id"} value={formData.id} onChange={handleChangeId}/>
                    </div>
                    <div>
                        <label htmlFor={"name"}>Name:</label>
                        <input type={"text"} name={"name"} id={"name"} value={formData.name} onChange={handleChangeName}/>
                    </div>
                    <div>
                        <label htmlFor={"status"}>Status:</label>
                        <input type={"text"} name={"status"} id={"status"} value={formData.status} onChange={handleChangeStatus}/>
                    </div>
                    <div>
                        <label htmlFor={"species"}>species:</label>
                        <input type={"text"} name="species" id={"species"} value={formData.species} onChange={handleChangeSpecies}/>
                    </div>
                    <div>
                        <label htmlFor={"type"}>type:</label>
                        <input type={"text"} name="type" id={"type"} value={formData.type} onChange={handleChangeType}/>
                    </div>
                    <button style={{backgroundColor: "blue"}} type={"submit"}>Submit</button>
                </form>
                <ul>
                    {submittedFormDatas.map(input => {
                        return <li key={input.id}>
                            <h2>Name: {input.name}</h2>
                            <h3>status: {input.status}</h3>
                            <p>type: {input.type}</p>
                            <p>species: {input.species}</p>

                        </li>
                    })}
                </ul>
        </>
    )
}