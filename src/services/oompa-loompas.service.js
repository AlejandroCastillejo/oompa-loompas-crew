import axios from "axios";

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

export const getDetailData = (id) => axios.get(`${URL}/${id}`);
