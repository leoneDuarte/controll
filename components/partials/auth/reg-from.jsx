import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "./store";

const schema = yup
  .object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("E-mail é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha não pode ter menos de 6 digitos")
      .max(20, "A senha não pode ter mais de 20 caracteres")
      .required("Por favor informe a senha"),
    // confirm password
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não batem"),
  })
  .required();

const RegForm = () => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const router = useRouter();

  const onSubmit = (data) => {
    dispatch(handleRegister(data));
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
      <Textinput
        name="name"
        label="Nome"
        type="text"
        placeholder="Insira seu Nome"
        register={register}
        error={errors.name}
      />{" "}
      <Textinput
        name="email"
        label="email"
        type="email"
        placeholder="Insira seu E-mail"
        register={register}
        error={errors.email}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        placeholder="Insira sua senha"
        register={register}
        error={errors.password}
      />
      <Checkbox
        label="Voce aceitar os termos e politicas de privacidade"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <button className="btn btn-dark block w-full text-center">
        Criar sua conta
      </button>
    </form>
  );
};

export default RegForm;
