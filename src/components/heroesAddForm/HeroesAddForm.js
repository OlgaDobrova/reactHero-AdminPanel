import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import nextId from "react-id-generator";
import { v4 as uuidv4 } from "uuid";

import { useHttp } from "../../hooks/http.hook";

import { heroesFetched, heroesFetchingError } from "../../actions";

import "./heroesAddForm.scss";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const { heroes, filters } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const addHeroes = (item) => {
    const newHero = { ...item, id: uuidv4() };

    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
      .then((data) => dispatch(heroesFetched([...heroes, data])))
      .catch(() => dispatch(heroesFetchingError()));
  };

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
        return addHeroes(item);
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
            <option value="fire">Огонь</option>
            <option value="water">Вода</option>
            <option value="wind">Ветер</option>
            <option value="earth">Земля</option>
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
