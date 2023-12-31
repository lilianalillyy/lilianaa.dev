import { Transition, Dialog } from "@headlessui/react";
import { useEffect, useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import { useCat } from "../hooks/api";
import { Loading } from "../../components/ui/Loading";
import { Image } from "../../components/ui/Image";
import { endpoint } from "../api";
import { TagContainer } from "./TagContainer";
import { Tag } from "./Tag";
import { XIcon } from "../../components/icons/XIcon";
import { c, formatDate } from "../../utils";
import { useLg } from "../../hooks/useLg";
import { PawIcon } from "../../components/icons/PawIcon";
import { useTitle } from "../../hooks/useTitle";

export interface CatViewProps {
    catId: number;
    transitionTimeout?: number;
    onClose?: () => void;
}

export const CatView = ({ onClose, catId, transitionTimeout = 300 }: CatViewProps) => {
    const { data: cat, isLoading } = useCat(catId);

    const [shown, setShown] = useState(true);

    const lg = useLg();

    useTitle(cat?.page_title ? cat.page_title : "", "Catter")

    useEffect(() => {
        const timeout = setTimeout(() => setShown(true), 0);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (!isLoading && !cat) {
            handleClose();
        }
    }, [cat, isLoading]);

    const handleClose = () => {
        setShown(false);
        setTimeout(() => onClose?.(), transitionTimeout);
    }

    const Header = () => (
        <div className={c("flex gap-4 items-start", cat ? "justify-between" : "justify-end", lg ? "pb-6" : "py-4 px-3")}>
            {cat && (lg ? (
                <div className={"inline-flex flex-col items-start gap-2"}>
                    {cat.cat_tags.length && (
                        cat.cat_tags.map(tag => <Tag className="w-fit" key={tag.id} color="secondary" compact tag={tag} />)
                    )}
                </div>
            ) : (
                <div className="text-xs font-mono inline-flex items-center gap-2">
                    <PawIcon className="w-4 h-4" />
                    <div>
                        {cat.cat_tags.map(tag => <div>{tag.content}</div>)}
                    </div>
                </div>
            ))}
            <button onClick={handleClose} className="text-slate-500 hover:text-black transition duration-300 ease-in-out-cubic">
                <XIcon className={lg ? "w-6 h-6" : "w-4 h-4"} />
            </button>
        </div>
    )

    return (
        <Transition appear show={shown} as={Fragment}>
            {/** @ts-ignore preact-react type fuckery */}
            <Dialog as="div" className={"relative z-10"} onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="transform overflow-hidden bg-white text-left align-middle shadow-2xl transition-all relative">
                                {!lg && <Header />}

                                <div className="flex flex-col lg:flex-row">
                                    {cat ? (
                                        <Image src={endpoint(cat.image_url)} containerClassName="h-full lg:h-96 w-full lg:w-96 bg-gray-200 shadow-2xl" className={"h-96 w-full lg:w-96 object-contain"} />
                                    ) : (
                                        <Loading containerClassName="h-96 w-96 bg-gray-100" />
                                    )}

                                    <div className="p-6 lg:w-96 lg:h-96 bg-gray-100">
                                        <div className="flex flex-col justify-between gap-6 h-full">

                                            {lg && <Header />}
                                            {isLoading ? (
                                                <Loading spinnerClassName="fill-violet-800 text-violet-200" />
                                            ) : cat ? (
                                                <>
                                                    <div className="font-mono text-xs text-gray-500 tracking-tighter">
                                                        {cat.content ? (
                                                            <div className="mb-6 max-w-sm h-32 break-all overflow-scroll" dangerouslySetInnerHTML={{ __html: cat.content }} />
                                                        ) : <i>(no description)</i>}
                                                    </div>

                                                    <div>
                                                        <TagContainer className="mb-3 justify-end">
                                                            {cat.tags.map(tag => <Tag key={tag.id} tag={tag} color="secondary" compact />)}
                                                        </TagContainer>

                                                        <div className="flex justify-between items-end">
                                                            <p className="text-xs font-mono">
                                                                {/** TODO */}
                                                                {formatDate(new Date(cat.date))}
                                                            </p>

                                                            <Tag tag={cat.camera_tag} color="secondary" compact />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <p className="font-mono tracking-widest">:&lt;</p>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}