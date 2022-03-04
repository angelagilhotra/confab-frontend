import router, {useRouter} from 'next/router';
import Main from 'layouts/Main';
import {Formik} from 'formik';
import {useQuery} from 'react-query';
import { useEffect, useState } from 'react';
import {RichTextArea} from "components/edit/eventDescription";
import {EditSessions} from "components/edit/sessions";
import {NextSeo} from 'next-seo';

type formTypes = {
  title: string,
  // proposerName: string,
  description: string,
  descriptionHtml?: string,
  location: string
}

const Post = () => {
  const {query, asPath: url} = useRouter();
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
    description: data?.description ?? '',
    location: data?.location ?? ''
  }), [data]);
  return (
    <>
      <NextSeo
        title="Edit Convo"
        openGraph={{
          url: `https://convo.kernel.community${url}`,
          title: `Edit Convo`,
          description: 'A home for conversations taking place in the Kernel network',
          images: [
            {
              url: 'https://confab-frontend.vercel.app/images/banner.jpg',
              alt: 'KERNEL squares and circles',
              type: 'image/jpeg',
            },
          ],
          site_name: 'KERNEL Convo',
        }}
      />
    <Main className='
      container
      mx-auto
    '>
      <Formik
       initialValues={initValues}
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
              ring-gray-300 border-gray-300
              focus:border-primary focus:ring-primary
              rounded-lg
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
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-24 gap-12">
            <div className='col-span-2'>
              <div className='pb-2'>
                <div className='flex flex-row items-center'>
                <label htmlFor="location" className='mr-2 font-secondary text-gray-800 uppercase text-base'>
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  {...formik.getFieldProps('location')}
                  className={`
                    ring-gray-300 border-gray-300
                    focus:border-primary focus:ring-primary
                    rounded-lg w-full
                  `}
                />
                </div>
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
                mt-4
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
                {formik.isSubmitting ?(
                <span className="bg-highlight rounded-full h-2 w-2 animate-ping">
                </span>):<></>}
                <div>
                  Submit
                </div>
              </div>
            </button>
            :
            <div className='font-secondary text-lg'>
              {errorMessage}&nbsp;
              <span className='lowercase underline cursor-pointer' onClick={() => setErrorMessage("")}>
                Try again?
              </span>
            </div>
          }
      </form>
      )
     }
     </Formik>
    </Main>
  </>
  );
};

export default Post;
