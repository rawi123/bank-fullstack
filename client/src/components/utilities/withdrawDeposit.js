import axios from "axios";
export const handelDeposit = async (e, input, setErrorMessage, updateSingleUser, url, data) => {
    e.preventDefault();
    try {
        // eslint-disable-next-line
        if (!input.ammount || Number(input.ammount) != input.ammount || Number(input.ammount) < 0)
            return setErrorMessage("Invalid input")

        const findUser = data.find(user => user.passportID === Number(input.id));

        if (!findUser.isActive)
            return setErrorMessage("User inactive");

        const user = await axios.put(url, { ammount: input.ammount });

        updateSingleUser(input.id, user.data);
        setErrorMessage("Updated Successfully!")
    }
    catch (err) {
        setErrorMessage("Error")
    }
}

export const updateUsers = (data,setData) => {
    if (!data.length) {
        axios.get(process.env.REACT_APP_API).then(data => {
            const dataSorted = data.data.sort((a, b) => a.passportID - b.passportID);
            setData(dataSorted);
            sessionStorage.setItem("data", JSON.stringify(dataSorted));
        })
    }
}