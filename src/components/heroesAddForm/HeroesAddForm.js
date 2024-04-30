import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
// import nextId from "react-id-generator";
import { v4 as uuidv4 } from "uuid";

import { useHttp } from "../../hooks/http.hook";

import { heroesCreated } from "../../actions";

import "./heroesAddForm.scss";

const HeroesAddForm = () => {
  const { filters } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const addHeroes = (item) => {
    const newHero = { ...item, id: uuidv4() };

    request(
      "http://localhost:3001/heroes",
      "POST",
      JSON.stringify(newHero)
    ).then((data) => dispatch(heroesCreated(data)));
  };

  const renderOptionsFiltersList = (arr) => {
    if (arr.length !== 0) {
      const newArr = arr.filter((item) => item.name !== "all");
      return newArr.map(({ id, ...props }) => {
        return (
          <option key={id} value={props.name}>
            {props.label}
          </option>
        );
      });
    }
  };

  const options = renderOptionsFiltersList(filters);

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        element: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Минимум 2 символа для заполнения!")
          .required("Обязательное поле!"),
        description: Yup.string().required("Обязательное поле!"),
        element: Yup.string().required("Выберите стихию героя"),
      })}
      onSubmit={(item, { resetForm }) => {
        resetForm();
        addHeroes(item);
      }}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Имя нового героя
          </label>
          <Field
            required
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Как меня зовут?"
          />
          <ErrorMessage className="error" name="name" component="div" />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fs-4">
            Описание
          </label>
          <Field
            as="textarea"
            required
            name="description"
            className="form-control"
            id="text"
            placeholder="Что я умею?"
            style={{ height: "130px" }}
          />
          <ErrorMessage className="error" name="description" component="div" />
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Выбрать элемент героя
          </label>
          <Field
            as="select"
            required
            className="form-select"
            id="element"
            name="element"
          >
            <option>Я владею элементом...</option>
            {options}
          </Field>
          <ErrorMessage className="error" name="element" component="div" />
        </div>

        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;
