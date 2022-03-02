import router, {useRouter} from 'next/router';
import Main from 'layouts/Main';
import {Formik} from 'formik';
import {useQuery} from 'react-query';
import { useEffect, useState } from 'react';
import {RichTextArea} from "components/edit/eventDescription";
import {EditSessions} from "components/edit/sessions";

type formTypes = {
  title: string,
  // proposerName: string,
  description: string,
  descriptionHtml?: string,
  location: string
}

const Post = () => {
  const {query} = useRouter();
  const {
    eventHash, magic, ts,
  } = query;
  const [initValues, setInitValues] = useState<formTypes>({
    title: '',
    // proposerName: '',
    description: '',
    descriptionHtml: '',
    location: ''
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {isLoading, isError, data, isFetching} = useQuery(
    `edit_${eventHash}`,
    async () => {
      const r = (await (await fetch('/api/getEvent', {
        body: JSON.stringify({
          event: eventHash
        }),
        method: 'POST',
        headers: {'Content-type': 'application/json'},
      })).json()).data;
      return r;
    }
  );
  useEffect(() => setInitValues({
    title: data?.title ?? '',
    // proposerName: data?.proposerName ?? '',
    description: data?.description ?? '',
    location: data?.location ?? ''
  }), [data]);
  return (
    <Main className='
      container
      mx-auto
    '>
      <Formik
       initialValues={initValues}
      //  validationSchema={Yup.object({
      //    firstName: Yup.string()
      //      .max(15, 'Must be 15 characters or less')
      //      .required('Required'),
      //    lastName: Yup.string()
      //      .max(20, 'Must be 20 characters or less')
      //      .required('Required'),
      //    email: Yup.string().email('Invalid email address').required('Required'),
      //  })}
       onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await (await fetch('/api/updateEvents', {
            body: JSON.stringify({
              ts,
              magic,
              hash: eventHash,
              data: {
                ...values,
                allSessions: data?.sessions
              }
            }),
            method: 'POST',
            headers: { 'Content-type': 'application/json' }
          })).json()
          setSubmitting(false);
          router.push({
            pathname: `/rsvp/${eventHash}`
          })
        } catch (err: any) {
          setErrorMessage("There was an error");
          console.log(err);
        }
       }}
       enableReinitialize={true}
     >
      {
      formik => (
        <form onSubmit={formik.handleSubmit} autoComplete="off" >
          <div className="flex flex-col justify-items-start">
            <input
              id="title"
              type="text"
              className="
                font-heading
                font-bold
                xl:text-5xl
                lg:text-4xl
                text-3xl
                text-primary
              "
              {...formik.getFieldProps('title')}
            />
            <div
              className="font-secondary sm:text-xl text-lg"
            >
              by&nbsp;
              <span>
                {data?.proposerName && data?.proposerName}
              </span>
            {/* <input
              className="font-secondary sm:text-xl text-lg"
              id="proposerName"
              type="text"
              {...formik.getFieldProps('proposerName')}
            /> */}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-24 gap-12">
            <div className='col-span-2'>
            <div>
              <label htmlFor="location">Location</label>
              <input type="text" id="location" {...formik.getFieldProps('location')} />
            </div>
            <RichTextArea
              id="description"
              {...formik.getFieldProps('description')}
              handleChange={formik.handleChange('descriptionHtml')}
            />
            </div>
            <div>
              {data?.sessions && <EditSessions sessions={data?.sessions} />}
            </div>
          </div>
         {!errorMessage ?
            <button
              className={`
                font-secondary
                py-2
                px-16
                rounded-lg
                text-lg
                uppercase
                transition-shadow
                duration-300
                ease-in-out
                ${formik.isSubmitting ? `
                  bg-gray-400
                  text-gray-600
                  cursor-not-allowed` :
                  `
                  bg-kernel
                  text-gray-200
                  hover:shadow-outline
                  `}
              `}
              type="submit"
            >
               <div className="flex flex-row items-center justify-center gap-4">
                {formik.isSubmitting ?(<span className="bg-highlight rounded-full h-2 w-2 animate-ping">
                </span>):<></>}
                <div>
                  Submit
                </div>
              </div>
            </button>
            :
            <div>{errorMessage}</div>
          }
      </form>
      )
     }
     </Formik>
    </Main>
  );
};

export default Post;
