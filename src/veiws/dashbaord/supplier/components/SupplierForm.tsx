import React from "react";
import { Paper, Typography, Box } from "@mui/material";
// import { Components } from "../../../../components";
// import { PostRequest } from "../../../../redux/actions/PostRequest";
import { useDispatch, useSelector } from "react-redux";
// import { Token } from "../../../../constant/token";
import { Controller, useForm } from "react-hook-form";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { Components } from "../../../../components";
import { Token } from "../../../../constant/token";
import { UpdateOwnState } from "../../../../redux/actions/state/state";

const SupplierForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const Api = useSelector((state) => state.Api);

  // ✅ react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      opening_balance: 0,
    },
  });

  // ✅ submit handler
  const onSubmit = async (data) => {
    try {
      const res = await dispatch(
        PostRequest(Api.AddSupplier, Token, data , "true")
      );

      if (res?.status == 201) {
        reset(); // clear form
        dispatch(UpdateOwnState())
        onSuccess?.();
      } else {
        alert(res?.data?.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating supplier");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "16px",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Add Supplier
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Components.Input
          label="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <Components.Input
          label="Phone"
          {...register("phone")}
        />

        <Components.Input
          label="Address"
          {...register("address")}
        />


        <Controller
        name="opening_balance"
        control={control}
        render={({ field }) => (
            <Components.Input
            label="Opening Balance"
            value={field.value}
            onChange={field.onChange}
            />
        )}
        />

        <Components.CustomBtn
          data={isSubmitting ? "Adding..." : "Add Supplier"}
          type="submit"
        //   click={onSubmit}
        />
      </Box>
    </Paper>
  );
};

export default SupplierForm;