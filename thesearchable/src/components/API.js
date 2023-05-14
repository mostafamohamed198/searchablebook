import { AxiosInstance } from "axios";
import axios from "axios";
const apiSettings = {

createListing: async (data) => {
    let form_data = new FormData();
    if (data.image_url)
        form_data.append("image_url", data.image_url, data.image_url.name);
    form_data.append("title", data.title);
    form_data.append("description", data.description);
    form_data.append("category", data.category);
    form_data.append("start_bid", data.start_bid);
    form_data.append("is_active", true);

const myNewModel = await axios
        .post(`mymodels/`, form_data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            return res;
        }).catch((error) => {
            return error.response;
        });

    if (myNewModel.status === 201) {
        window.location.href = `/mymodels/${myNewModel.data.id}`;
    }
    return myNewModel;
    },
};

export default apiSettings;
