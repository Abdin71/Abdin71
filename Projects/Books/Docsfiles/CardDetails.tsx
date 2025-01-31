import ChildModal from "@/components/modal-provider/ChildModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { generatePastelColor } from "@/lib/colorGenerator";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInitials, timeAgo } from "@/helpers/formatters";
import {
  useGetCardQuery,
  useUpdateCardMutation,
} from "@/lib/features/api/card/cardApiSlice";
import { cn } from "@/lib/utils";
import { Paperclip } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { MdAddCard } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import ScaleLoader from "react-spinners/ScaleLoader";
import AddAttachment from "./AddAttachment";
import AddChecklists from "./AddChecklist";
import AddLabel from "./AddLabel";
import AddMember from "./AddMember";
import AttachmentPreview from "./AttachmentPreview";
import ChecklistDisplay from "./ChecklistDisplay";
import Comments from "./Comments";
import MoveCard from "./MoveCard";
import { List } from "@/lib/features/api/list/listApi";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import CopyCard from "./CopyCard";
import { getFlashingAnimation } from "@/helpers/animationHelpers";
import { getColor } from "@/lib/getColor";
import RemoveCard from "./removeCard";
import { getColor } from "@/lib/getColor";
const QuillEditor = dynamic(
  async () => {
    const { default: ReactQuill } = await import("react-quill");
    const Quill = (await import("quill")).default;
    const MagicUrl = (await import("quill-magic-url")).default;

    // Register MagicUrl module with Quill
    Quill.register("modules/magicUrl", MagicUrl);

    // Access and customize the Link format
    const Link = Quill.import("formats/link");
    Link.sanitize = function (url: string) {
      // Ensure links start with http:// or https://
      if (!/^https?:\/\//.test(url)) {
        return `http://${url}`;
      }
      return url;
    };

    return ReactQuill;
  },
  { ssr: false },
);

export const modules = {
  magicUrl: true,
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
  ],
};

const colors = [
  "bg-slate-600",
  "bg-red-800",
  "bg-orange-600",
  "bg-amber-400",
  "bg-lime-500",
  "bg-indigo-500",
  "bg-rose-800",
];

const priorities = [
  { title: "1st", color: "bg-[#FF0000]" },
  { title: "2nd", color: "bg-orange-500" },
  { title: "3rd", color: "bg-yellow-500" },
  { title: "4th", color: "bg-green-500" },
  { title: "5th", color: "bg-blue-500" },
];

const otherPriorities = ["6th", "7th", "8th", "9th", "10th"];

const points = [
  { number: 1, color: "bg-[#FF0000]" },
  { number: 2, color: "bg-[#FFA500]" },
  { number: 3, color: "bg-[#00FFFF]" },
  { number: 4, color: "bg-[#8A2BE2]" },
  { number: 5, color: "bg-[#32CD32]" },
  { number: 6, color: "bg-[#FF69B4]" },
  { number: 7, color: "bg-[#FFD700]" },
  { number: 8, color: "bg-[#4B0082]" },
  { number: 9, color: "bg-[#FF4500]" },
  { number: 10, color: "bg-[#1E90FF]" },
];

const CardDetails = ({
  isOpen,
  cardId,
  setIsOpen,
  board,
  list,
  isFlashingEnabled,
  setIsFlashingEnabled,
}: Readonly<{
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  cardId: string;
  board: string;
  list: List;
  isFlashingEnabled: boolean;
  setIsFlashingEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}>) => {
  const {
    data: card,
    isError,
    isLoading: isFetchingDetails,
    refetch,
  } = useGetCardQuery(cardId);
  const [
    updateCard,
    {
      isLoading: isCardUpdateLoading,
      isSuccess: isCardUpdateSuccess,
      isError: isCardUpdateError,
    },
  ] = useUpdateCardMutation();
  const [editingDescription, setEditingDescription] = useState<boolean>(false);
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(card?.description!);
  const [title, setTitle] = useState<string>(card?.title!);
  const [priorityOpen, setPriorityOpen] = useState<boolean>(false);
  const [pointsOpen, setPointsOpen] = useState<boolean>(false);
  const SELECTOR_CONTAINER = "#quill-container-2";
  const descriptionInputref = useRef<HTMLTextAreaElement | null>(null);
  const animationClass = isFlashingEnabled
    ? getFlashingAnimation(card?.priority || "")
    : "";

  useEffect(() => {
    setDescription(card?.description!);
  }, [card?.description]);

  const handleUpdateDescription = async () => {
    if (description === card?.description) {
      setEditingDescription(false);
      return;
    }
    try {
      const updatedData = await updateCard({
        ...card,
        description: description,
      }).unwrap();
      setEditingDescription(false);
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleUpdatePriority = async (priority: string) => {
    if (!priority) {
      return;
    }
    try {
      const updatedData = await updateCard({ ...card, priority: priority })
        .unwrap()
        .then(() => {
          setPriorityOpen(false);
        });
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleRemovePriority = async () => {
    try {
      await updateCard({ ...card, priority: "" }) // Remove priority by setting it to null
        .unwrap()
        .then(() => {
          setPriorityOpen(false);
        });
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleUpdateTitle = async () => {
    if (!title) {
      setEditingTitle(false);
      return;
    }
    try {
      const updatedData = await updateCard({ ...card, title: title }).unwrap();
      setEditingTitle(false);
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleUpdatePoints = async (points: number) => {
    if (!points) {
      return;
    }
    const pointsNumber = points === card?.points ? 0 : points;

    try {
      const updatedData = await updateCard({ ...card, points: pointsNumber })
        .unwrap()
        .then(() => {
          setPointsOpen(false);
        });
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const activeWorkspace = searchParams.get("workspace");
  function handleClose() {
    if (priorityOpen || pointsOpen) return;
    if (isOpen) {
      router.replace(path + `?workspace=${activeWorkspace}`);
    }
    setIsOpen(!isOpen);
  }

  const enableEditing = () => {
    setEditingDescription(true);
    setTimeout(() => {
      descriptionInputref?.current?.focus();
    });
  };

  const generatedPointBgColor = generatePastelColor(Number(card?.points) || 0);

  //handle html tags from react-quill
  const setHTML = (htmlText: string) => {
    return htmlText
      .replace(new RegExp("<h1", "g"), " <h1 class='text-3xl' ")
      .replace(new RegExp("<h2", "g"), " <h2 class='text-2xl' ")
      .replace(new RegExp("<h3", "g"), " <h3 class='text-xl' ")
      .replace(new RegExp("<ol", "g"), " <ol class='list-decimal list-inside' ")
      .replace(new RegExp("<ul", "g"), " <ul class='list-disc list-inside' ")
      .replace(
        new RegExp("<a", "g"),
        " <a class='text-blue-700 visited:text-fuchsia-900' ",
      );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogOverlay className="bg-aux/30" />
        <DialogContent className="md:!overflow-y-auto px-0 bg-[#1F2124] h-5/6 text-[#BBC8D4] border border-brand/10 flex flex-col w-full max-w-5xl !rounded-lg">
          <div className=" flex flex-col w-full mb-4 items-baseline gap-2 px-6">
            {isFetchingDetails ? (
              <span className=" font-semibold text-white">
                <Skeleton className="h-3 w-[30%] rounded-sm bg-[#282A2D]" />
              </span>
            ) : editingTitle ? (
              <span className=" font-semibold text-white w-full">
                <input
                  placeholder="Card title"
                  onBlur={handleUpdateTitle}
                  defaultValue={card?.title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-sm bg-transparent text-white p-2 border border-[#414245]"
                />
              </span>
            ) : (
              <span
                onClick={() => setEditingTitle(true)}
                className={`font-semibold text-white hover:cursor-pointer ${animationClass}`}
              >
                {card?.title}
              </span>
            )}
            <div className=" flex justify-between w-full">
              <div className="flex gap-2">
                {card?.created_at && (
                  <p
                    className=" text-[10px] font-medium
            "
                  >
                    Created {timeAgo(card?.created_at!)}
                  </p>
                )}
                {card?.updated_at && (
                  <>
                    <span className="block w-[1px] bg-white/30" />
                    <p className=" text-[10px] font-medium">
                      Updated {timeAgo(card?.updated_at!)}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <ScrollArea>
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-10 px-6 max-md:space-y-6">
              <div className="col-span-3">
                <div className="h-full max-md:space-y-5">
                  {card?.labels && (
                    <div className="flex flex-col">
                      <div className="flex flex-wrap gap-2 my-2 mt-5 pb-4">
                        {card?.labels?.map((label, index) => {
                          return (
                            <span
                              key={index}
                              className=" px-3 min-w-[70px] flex justify-center  py-1 text-white text-[12px] font-semibold rounded-[4px]"
                              style={{ backgroundColor: label.color }}
                            >
                              {label?.text}
                            </span>
                          );
                        })}
                        {/* Priority display */}
                        {card?.priority && (
                          <span
                            className={cn(
                              " px-3 min-w-[70px] flex justify-center  py-1 text-white text-[12px] font-semibold rounded-[4px] ",
                              card.priority === "1st"
                                ? "bg-[#FF0000]"
                                : card.priority === "2nd"
                                  ? "bg-orange-500"
                                  : card.priority === "3rd"
                                    ? "bg-yellow-500"
                                    : card.priority === "4th"
                                      ? "bg-green-500"
                                      : card.priority === "5th"
                                        ? "bg-blue-500"
                                        : "bg-[#808080]",
                            )}
                          >
                            {card.priority} Priority
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="flex gap-1 md:gap-6 items-center border-t border-white/5 pt-4">
                      <span>
                        <CgDetailsMore color="#fff" size={25} />
                      </span>
                      <span className="text-white text-[15px] font-semibold">
                        Description
                      </span>
                      <span className=" ml-auto">
                        <Button
                          className="text-sm text-opacity-70 hover:text-opacity-100 font-medium justify-start bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto"
                          onClick={enableEditing}
                        >
                          Edit
                        </Button>
                      </span>
                    </div>
                    {isFetchingDetails ? (
                      <div className="pl-1 md:pl-12 text-sm py-2 pb-5 flex flex-col gap-2">
                        <Skeleton className="h-3 w-full rounded-sm bg-[#282A2D]" />
                        <Skeleton className="h-3 w-[80%] rounded-sm bg-[#282A2D]" />
                        <Skeleton className="h-3 w-[60%] rounded-sm bg-[#282A2D]" />
                        <Skeleton className="h-3 w-[40%] rounded-sm bg-[#282A2D]" />
                      </div>
                    ) : editingDescription ? (
                      <div
                        id="quillContainer"
                        className="text-sm py-2 pb-5 flex flex-col gap-2 items-end w-full"
                      >
                        <QuillEditor
                          theme="snow"
                          value={description}
                          onChange={(value) => setDescription(value)}
                          className="w-full rounded-sm text-[#BBC8D4] bg-[#282A2D] p-2 "
                          bounds={"#quillContainer"}
                          modules={modules}
                        />

                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingDescription(false)}
                            className=" border border-gray-600 bg-gray-600 hover:bg-gray-700 text-white text-[12px] rounded px-5 font-semibold flex items-center py-0.5"
                            disabled={isCardUpdateLoading}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleUpdateDescription}
                            className=" border border-[#586AEA] bg-[#586AEA] text-white text-[12px] rounded px-5 font-semibold flex items-center py-0.5"
                            disabled={isCardUpdateLoading}
                          >
                            {isCardUpdateLoading ? (
                              <ScaleLoader color="#fff" height={8} />
                            ) : (
                              "Save"
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className=" pl-1 md:pl-12 text-sm py-2 pb-5 hover:cursor-pointer break-words"
                        onDoubleClick={enableEditing}
                      >
                        {card?.description ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: setHTML(card?.description),
                            }}
                          />
                        ) : (
                          <button className=" w-full text-sm rounded-sm h-10 text-[#BBC8D4] bg-[#282A2D] text-start px-2 pb-10 pt-2">
                            Describe your story...
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {card?.attachments && card?.attachments?.length > 0 && (
                    <div className="mb-6 border-t border-white/5 pt-4">
                      <div className="flex gap-2 mb-4">
                        <Paperclip className="w-4 h-4" />
                        <p className="text-white text-[14px] font-semibold mb-3">
                          Attachments
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-y-6 gap-x-5">
                        {card.attachments.map((attachment, key) => (
                          <AttachmentPreview
                            attachmentUrl={attachment}
                            idx={key}
                            key={key}
                            card={card}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {card && (
                    <ChecklistDisplay
                      refetch={refetch}
                      initialChecklists={card.checklist}
                    />
                  )}

                  <div className="flex border-t border-white/5 pt-4">
                    <Tabs defaultValue="comments" className="w-full">
                      <div className="flex">
                        <div className="flex gap-2">
                          <span>
                            <RxActivityLog size={17} color="#fff" />
                          </span>
                          <span className="text-[14px] font-semibold text-white">
                            Activity
                          </span>
                        </div>
                        <TabsList className=" bg-transparent ml-auto">
                          <TabsTrigger
                            value="comments"
                            className=" rounded-md py-1 text-sm"
                          >
                            Comments
                          </TabsTrigger>
                          <TabsTrigger
                            value="log"
                            className=" rounded-md py-1 text-sm"
                          >
                            Log
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      {card && <Comments cardId={card.id} />}
                      <TabsContent
                        value="log"
                        className="text-sm flex flex-col"
                      >
                        <div className="flex items-start pl-6">
                          <span className=" w-[5%]">
                            <Avatar className=" items-start size-6">
                              <AvatarImage src="" />
                              <AvatarFallback
                                className={` ${colors[1]
                                  } text-white text-[13px] font-black`}
                              >
                                IB
                              </AvatarFallback>
                            </Avatar>
                          </span>
                          <span className=" font-semibold">
                            Ibrahim Yakubu:{" "}
                            <span className=" font-light">added a comment</span>
                          </span>
                          <span className=" ml-auto text-[11px] font-thin">
                            2 days ago
                          </span>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
              <div className=" flex gap-2 flex-col">
                <div className="flex flex-col gap-2">
                  <div className=" flex items-center mb-4">
                    <span className=" flex items-center gap-2 text-white">
                      <MdAddCard color="#fff" size={20} />{" "}
                      <span className="text-[14px] font-semibold">Top-up</span>{" "}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <AddMember
                      card={card}
                      board={board}
                      workspace={activeWorkspace!}
                    >
                      <Button className="text-sm w-full flex justify-between text-opacity-70 hover:text-opacity-100 font-medium bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto">
                        Members
                        <span className="flex items-center">
                          {card?.members?.slice(0, 3).map((member, index) => {
                            return (
                              <TooltipProvider key={index}>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Avatar
                                      className={` items-center h-max w-max ${index > 0 && "-ml-1"}`}
                                    >
                                      <AvatarFallback
                                        className={` ${getColor(member?.user?.id)} text-white text-[8px] font-black w-4 h-4`}
                                      >
                                        {getInitials(
                                          member?.user.first_name?.toLowerCase() +
                                          " " +
                                          member?.user.last_name?.toLowerCase(),
                                        )}
                                      </AvatarFallback>
                                    </Avatar>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{`${member.user.first_name} ${member.user.last_name}`}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          })}
                          {card?.members && card?.members?.length > 3 && (
                            <p className=" text-white ml-1 text-[11px] font-bold">
                              + {card!.members?.length - 3}
                            </p>
                          )}
                        </span>
                      </Button>
                    </AddMember>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      disabled
                      className="text-sm text-opacity-70 hover:text-opacity-100 font-medium justify-start bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto"
                    >
                      Dates
                    </Button>
                    <AddChecklists cardId={cardId}>
                      <Button className="text-sm text-opacity-70 hover:text-opacity-100 font-medium justify-start bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto">
                        Checklists
                      </Button>
                    </AddChecklists>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      disabled
                      className="text-sm text-opacity-70 hover:text-opacity-100 font-medium justify-start bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto"
                    >
                      Cover
                    </Button>
                    <AddLabel card={card!} board={board}>
                      <Button className="text-sm text-opacity-70 hover:text-opacity-100 font-medium justify-start bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto">
                        Labels
                      </Button>
                    </AddLabel>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      disabled
                      className="text-sm text-opacity-70 hover:text-opacity-100 font-medium justify-start bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto"
                    >
                      Field
                    </Button>
                    <AddAttachment card={card!}>
                      <Button className="text-sm text-opacity-70 hover:text-opacity-100 font-medium justify-start bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto">
                        Attachment
                      </Button>
                    </AddAttachment>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <Popover
                      modal={true}
                      open={priorityOpen}
                      onOpenChange={(isOpen) => setPriorityOpen(isOpen)}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          className={cn(
                            "text-sm text-opacity-70 hover:text-opacity-100 font-medium justify-start bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto",
                            card?.priority === "1st"
                              ? "bg-[#FF0000]"
                              : card?.priority === "2nd"
                                ? "bg-orange-500"
                                : card?.priority === "3rd"
                                  ? "bg-yellow-500"
                                  : card?.priority === "4th"
                                    ? "bg-green-500"
                                    : card?.priority === "5th"
                                      ? "bg-blue-500"
                                      : card?.priority
                                        ? "bg-[#808080]"
                                        : "bg-white/5",
                            card?.priority && "font-semibold text-opacity-100",
                          )}
                        >
                          {card?.priority
                            ? `${card.priority} Priority`
                            : "Priority"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="bg-[#1F2124] max-w-40 flex flex-col gap-2">
                        <span className="font-semibold text-sm text-white">
                          {addPriority}
                        </span>
                        <div className=" gap-1 flex flex-col">
                          {priorities.map((priority, index) => {
                            return (
                              <button
                                onClick={() =>
                                  handleUpdatePriority(priority.title)
                                }
                                key={index}
                                className={cn(
                                  " text-[11px] rounded-sm font-bold text-center text-white px-2 py-1 ",
                                  priority.color,
                                )}
                              >
                                {priority.title} priority
                              </button>
                            );
                          })}
                          <select
                            aria-label="Priorities"
                            onChange={(e) =>
                              handleUpdatePriority(e.target.value)
                            }
                            className=" rounded-sm text-[11px] text-white font-bold bg-[#808080] py-1 text-center pl-3"
                          >
                            {otherPriorities.map((priority, index) => {
                              return (
                                <option key={index} value={priority}>
                                  {priority} priority
                                </option>
                              );
                            })}
                          </select>
                          {/* Conditional rendering for the toggle button */}
                          {card &&
                            ["1st", "2nd", "3rd"].includes(card.priority) && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsFlashingEnabled(!isFlashingEnabled);
                                }}
                                className={cn(
                                  `${animationClass} border text-[11px] font-bold text-white py-1 px-2 rounded-sm mt-2`,
                                  isFlashingEnabled
                                    ? card.priority === "1st"
                                      ? "border-[#FF0000]"
                                      : card.priority === "2nd"
                                        ? "border-orange-500"
                                        : card.priority === "3rd"
                                          ? "border-yellow-500"
                                          : "border-gray-500"
                                    : "border-white",
                                )}
                              >
                                {isFlashingEnabled ? "Off" : "On"}
                              </button>
                            )}
                          {/* Remove Priority Button */}
                          {card?.priority && (
                            <button
                              onClick={() => handleRemovePriority()}
                              className="mt-1 text-red-500 text-[11px] font-bold text-center bg-transparent border border-red-500 rounded-sm px-2 py-1 hover:bg-red-500 hover:text-white transition duration-300"
                            >
                              Remove Priority
                            </button>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <Popover
                      modal={true}
                      open={pointsOpen}
                      onOpenChange={(isOpen) => setPointsOpen(isOpen)}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          className={cn(
                            "text-sm text-opacity-70 hover:text-opacity-100 font-medium justify-start  shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto",
                            card?.points
                              ? "text-black font-semibold text-opacity-100"
                              : "!bg-white/5",
                          )}
                          style={{
                            backgroundColor: generatedPointBgColor,
                          }}
                        >
                          {card?.points && card?.points > 0
                            ? `${card?.points} ${card?.points > 1 ? "Points" : "Point"}`
                            : "Points"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="bg-[#1F2124] max-w-40 flex flex-col gap-2">
                        <span className="font-semibold text-sm text-white">
                          {addPoints}
                        </span>
                        <div className=" gap-1 grid grid-cols-3">
                          {points.map((point, index) => {
                            return (
                              <button
                                onClick={() => handleUpdatePoints(point.number)}
                                key={index}
                                className={cn(
                                  " text-[11px] rounded-sm font-bold text-center text-white px-2 py-1",
                                  card?.points === point.number
                                    ? "bg-aux"
                                    : "bg-aux/30",
                                )}
                              >
                                {point.number}
                              </button>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <MoveCard
                    card={card}
                    boardId={board}
                    workspace={activeWorkspace!}
                    list={list}
                    setIsOpen={setIsOpen}
                  >
                    <Button className="text-sm text-opacity-70 hover:text-opacity-100 font-medium justify-start bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto">
                      Move
                    </Button>
                  </MoveCard>
                </div>
                <div className="flex flex-col gap-2">
                  <CopyCard
                    card={card}
                    boardId={board}
                    workspace={activeWorkspace!}
                  >
                    <Button className="text-sm text-opacity-70 hover:text-opacity-100 font-medium justify-start bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto">
                      Copy
                    </Button>
                  </CopyCard>
                </div>
                <div className="flex flex-col gap-2">
                  <RemoveCard
                    cardId={cardId}
                    onDeleteClose={handleClose}
                  >
                    <Button className="text-xs text-opacity-70 hover:text-opacity-100 font-medium justify-start bg-white/5 shadow-md hover:bg-white/5 hover:scale-95 transition duration-500 py-2 h-auto">
                      Delete
                    </Button>
                  </RemoveCard>
                </div>
              </div>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </DialogContent>

        <ChildModal modalType="ATTACHMENT" />
      </Dialog>
    </>
  );
};

// @Constants starts
const addPriority = "Add Priority";
const addPoints = "Add Points";

// @Constants ends

export default CardDetails;
