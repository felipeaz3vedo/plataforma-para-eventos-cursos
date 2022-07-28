import { DefaultUi, Player, Youtube } from "@vime/react";
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Image,
  Lightning,
} from "phosphor-react";

import "@vime/core/themes/default.css"; //olhar como configura as features do video
import { LoaderSpin } from "./LoaderSpin";
import { useGetLessonBySlugQuery } from "../graphql/generated";
import { LogoFooter } from "./LogoFooter";

interface VideoProps {
  lessonSlug: string;
}

export function Video(props: VideoProps) {
  const { data } = useGetLessonBySlugQuery({
    variables: {
      slug: props.lessonSlug,
    },
  });

  if (!data || !data.lesson?.videoId) {
    return <LoaderSpin />;
  }
  console.log(data?.lesson.videoId);
  return (
    <div className="flex-1">
      <div className="bg-gray-900 flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>
      <div className="p-8 max-w-[1100px] mx-auto">
        <div className=" flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold ">{data?.lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>
            {data.lesson.teacher && (
              <div className="flex items center gap-4 mt-6">
                <img
                  className="h-16 w-16 rounded-full border-2 border-blue-500"
                  src={data?.lesson.teacher.avatarURL}
                  alt=""
                />
                <div className="flex flex-col items-start justify-center leading-relaxed">
                  <strong className="font-bold text 2xl block">
                    {data?.lesson.teacher.name}
                  </strong>
                  <span className="text-gray-200 text-sm block">
                    {data?.lesson.teacher.bio}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors"
            >
              <DiscordLogo size={24} />
              comunidade discord
            </a>

            <a
              href="#"
              className="p-4 text-sm border border-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:text-gray-900 hover:bg-blue-500 transition-colors "
            >
              <Lightning size={24} />
              acesse o desafio
            </a>
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2 pb-20">
          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6  hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
      <footer className="flex max-w-[95%]  text-gray-300 py-6 border-t mx-auto border-gray-600">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-6 items-center">
            <div>
              <LogoFooter />
            </div>
            <p>Rocketseat - Todos os direitos reservados </p>
          </div>
          <div>
            <p>Políticas de privacidade</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
