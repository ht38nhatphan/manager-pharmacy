// [GET] ALL supelier
export const getAllSupelier = async (dispatch) => {
  // dispatch(getProductStart());
  try {
    const res = await axios.get("/supelier/getAllSupelier")
    dispatch(getsupelierSuccess(res.data))
  } catch (error) {
  }


}
// [POST] ADD supelier
export const addSupelier = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    // const res1 = await axios.get("/thuocs/getAll")
    const res = await axios.post("/supelier/addSupelier", product
    )
    dispatch(addsupelierSuccess(res.data))

  } catch (error) {

  }
}