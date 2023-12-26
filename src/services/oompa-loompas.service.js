import axios from "axios";

// ToDo: Declare URL in constants file or enviroment variables
const URL =
  "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas";

export const getPageData = async (page) => {
  const res = await axios.get(URL, { params: { page } });
  // filter response.data
  return {
    ...res,
    data: {
      ...res.data,
      results: res.data.results.map(
        ({ id, first_name, last_name, profession, gender, image }) => ({
          id,
          first_name,
          last_name,
          profession,
          gender,
          image,
        })
      ),
    },
  };
};

export const getDetailData = async (id) => {
  const res = await axios.get(`${URL}/${id}`);
  // filter response.data
  return {
    ...res,
    data: {
      first_name: res.data.first_name,
      last_name: res.data.last_name,
      gender: res.data.gender,
      profession: res.data.profession,
      description: res.data.description,
      image: res.data.image,
    },
  };
};
