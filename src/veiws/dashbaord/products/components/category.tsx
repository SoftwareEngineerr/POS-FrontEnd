import React, { useState, ChangeEvent } from "react";
import { Components } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { Token } from "../../../../constant/token";
import { UpdateOwnState } from "../../../../redux/actions/state/state";
// import UpdateState from "../../../../redux/reducer/state/state";

const Category: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const dispatch = useDispatch()
  const url = useSelector((state)=>state.Api)

  // Save category handler
  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      alert("Category name is required");
      return;
    }

    console.log("New Category:", categoryName, image);
    const payload = {
        name : categoryName,
        image_url : image
    }
    dispatch(PostRequest(url.AddCategory , Token , payload))
    
    
    
    // TODO: send API
    // name: categoryName
    // image: image
    
    setCategoryName("");
    setImage(null);
    setOpen(false);
    dispatch(UpdateOwnState("success"));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  };

  return (
    <div>

      <Components.CustomBtn
        style={{ width: "100%", marginBottom: "20px" }}
        data="+ Add Category"
        click={() => setOpen(true)}
      />

      {open && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3 style={{ marginBottom: "10px" }}>Add Category</h3>

            <Components.Input
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={handleInputChange}
            />

            {/* ✅ KEEP YOUR COMPONENT EXACTLY SAME */}
            <Components.Image
              name="category_image"
              GetSelectedValue={(val: any) => setImage(val[0])}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
              <Components.CustomBtn
                style={{ background: "#764ba2" }}
                click={handleAddCategory}
                data="Save"
              />

              <Components.CustomBtn
                style={{ background: "#764ba2" }}
                click={() => setOpen(false)}
                data="Cancel"
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Category;