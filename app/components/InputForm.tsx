import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React, { ChangeEvent } from "react";

type Props = {
  value: string;
  handleSubmit: () => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isLoading: boolean;
};

const InputForm = ({
  value,
  handleSubmit,
  handleInputChange,
  isLoading,
}: Props) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 w-full bg-white px-4 pb-4 sm:px-10 md:px-40 fixed bottom-0 left-1/2 -translate-x-1/2"
    >
      <div className="absolute from-white/90 to-transparent bg-gradient-to-t top-0 -translate-y-full z-10 left-0 w-full h-20"></div>

      <Input
        name="prompt"
        autoComplete="off"
        className="min-w-80 w-full h-10 border border-neutral-700/70"
        value={value}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <Button
        size={"icon"}
        className="h-10 aspect-square md:aspect-auto w-auto"
        type="submit"
      >
        <Send className="md:hidden" />
        <p className="hidden md:block font-semibold px-4">Send</p>
      </Button>
    </form>
  );
};

export default InputForm;
