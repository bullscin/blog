// /* eslint-disable react/jsx-props-no-spreading */
// // eslint-disable-next-line react/forbid-prop-types
// import React from "react";
// import PropTypes from "prop-types";
// import { useFieldArray } from "react-hook-form";
// import cl from "../../pages/PageCreateArticle/PageCreateArticle.module.scss";
// import {
//   validationMethods,
//   //   validateAndTrimData
// } from "../../utilities/utilities";

// function ArticleForm({
//   register,
//   control,
//   errors,
//   defaultValues,
//   addTag,
//   deleteTag,
// }) {
//   const { fields } = useFieldArray({
//     control,
//     name: "tags",
//   });
//   console.log(fields);

//   return (
//     <>
//       {/* Title Field */}
//       <label htmlFor="title">
//         Title
//         <input
//           className={cl.input}
//           id="title"
//           type="text"
//           placeholder="Title"
//           defaultValue={defaultValues?.title}
//           {...register("title", {
//             validate: (value) => validationMethods.validateTitle(value),
//           })}
//         />
//         {errors.title && (
//           <span className={cl["page-create-article__error"]}>
//             {errors.title.message}
//           </span>
//         )}
//       </label>

//       {/* Short description Field */}
//       <label htmlFor="description">
//         Short description
//         <input
//           className={cl.input}
//           id="description"
//           type="text"
//           placeholder="Short description"
//           defaultValue={defaultValues?.description}
//           {...register("description", {
//             validate: (value) => validationMethods.validateDescription(value),
//           })}
//         />
//         {errors.description && (
//           <span className={cl["page-create-article__error"]}>
//             {errors.description.message}
//           </span>
//         )}
//       </label>

//       {/* Text Field */}
//       <label htmlFor="body">
//         Text
//         <textarea
//           className={cl["input-textarea"]}
//           name="text"
//           id="body"
//           cols="30"
//           rows="10"
//           placeholder="Text"
//           defaultValue={defaultValues?.body}
//           {...register("body", {
//             validate: (value) => validationMethods.validateBody(value),
//           })}
//         />
//         {errors.body && (
//           <span className={cl["page-create-article__error"]}>
//             {errors.body.message}
//           </span>
//         )}
//       </label>

//       {/* Tags Field */}
//       <label htmlFor="tag">
//         Tags
//         <div className={cl.tags}>
//           {fields.map((tag, index) => (
//             <div key={tag.id}>
//               <input
//                 id="tag"
//                 className={cl.tag}
//                 type="text"
//                 placeholder="Tag"
//                 {...register(`tags.${index}.tag`, { required: true })}
//                 defaultValue={tag.tag}
//               />

//               <button
//                 type="button"
//                 className={cl.del}
//                 onClick={() => deleteTag(index)}
//               >
//                 DELETE
//               </button>
//             </div>
//           ))}
//           <button type="button" className={cl.add} onClick={addTag}>
//             ADD TAG
//           </button>
//         </div>
//       </label>
//     </>
//   );
// }

// ArticleForm.propTypes = {
//   register: PropTypes.func.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   control: PropTypes.object.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   errors: PropTypes.object.isRequired,
//   defaultValues: PropTypes.shape({
//     title: PropTypes.string,
//     description: PropTypes.string,
//     body: PropTypes.string,
//   }).isRequired,
//   addTag: PropTypes.func.isRequired,
//   deleteTag: PropTypes.func.isRequired,
// };

// export default ArticleForm;
