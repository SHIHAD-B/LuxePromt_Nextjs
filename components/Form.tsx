import Link from "next/link";
import { FormEvent } from "react";

interface FormProps {
  type: string;
  post: {
    prompt: string;
    tag: string;
  };
  setPost: React.Dispatch<React.SetStateAction<{ prompt: string; tag: string }>>;
  submitting: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your unique prompts with the world, inspiring creativity and innovation through this platform. Let your imagination soar!
      </p>
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here...."
            required
            className="form_textarea w-[80vw]"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Tags {" "}
            <span className="font-normal">(#product, #idea, #Microsoft)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input w-[80vw]"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <button type="submit" disabled={submitting} className="btn-primary px-5 py-1.5 text-sm bg-blue-800 text-white rounded">
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
