import Image from 'next/image';

export function PostModal(props: {
  showModal: boolean
  setShowModal: any
  image: { user: string; src: string; likes: number; dislikes: number }
  subtitle: string
}) {
  const image = props.image
  const subtitle = props.subtitle
  const showModal = props.showModal
  const setShowModal = props.setShowModal
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="flex flex-row w-auto my-6 mx-auto max-w-3xl bg-gray-200">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col flex-grow w-full outline-none focus:outline-none min-w-full">
                <div className="flex flex-row w-full">
                  <div className="flex items-center justify-center w-3/5 border-slate-200 rounded-t  ">
                    <div className="w-full h-full">
                      <Image
                        src={image.src}
                        alt="search result"
                        width={460}
                        height={460}
                      />
                    </div>
                  </div>
                  <div className="full-w full-h flex flex-col">
                    <div className="relative p-5 w-full flex-auto">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-sm w-7 h-7 inline-flex justify-center items-center dark:hover:text-gray-700"
                          onClick={() => setShowModal(false)}
                        >
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      <div className="flex items-center justify-start gap-2 px-2 py-3 text-xl font-bold">
                        <Image
                          className="w-6 rounded-full ring-2 ring-teal-500 "
                          src={`/profile.svg`}
                          alt="Bordered avatar"
                          width={24}
                          height={24}
                        />
                        <h3 className="text-sm text-gray-700">{image.user} </h3>
                      </div>
                      <div className="w-60">
                        <p className="gap-y-2 ml-3 text-slate-500 text-lg leading-relaxed">
                          {subtitle}
                        </p>
                      </div>
                      <div className="px-3 py-3 flex justify-end">
                        <ul className="flex flex-row items-center">
                          <li className="flex items-center mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="text-gray-700"
                              viewBox="0 0 20 20"
                              className="inline-block w-6 h-5 mr-1"
                            >
                              <path d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                            </svg>
                            <p className="mr-1 mt-1 text-gray-700">
                              {image.likes}
                            </p>
                          </li>
                          <li className="flex items-center mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="text-gray-700"
                              viewBox="0 0 20 20"
                              className="inline-block w-6 h-5 mr-1"
                            >
                              <path d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                            </svg>
                            <p className="mr-1 text-gray-700">
                              {' '}
                              {image.dislikes}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-end p-6 w-full border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Apagar
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
