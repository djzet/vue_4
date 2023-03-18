import axios from "@/api/axios";

const create = (user) => {
    return axios.post("/order", user);
};

export default {
    create,
}