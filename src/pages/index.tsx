import Link from 'next/link';
import { useRef } from 'react';
import { trpc } from '../utils/trpc';

const QuestionCreator: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation('questions.create', {
    onSuccess: () => {
      client.invalidateQueries('questions.get-all-my-questions');
      if (!inputRef.current) return;
      inputRef.current.value = '';
    },
  });

  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          mutate({ question: event.currentTarget.value });
        }
      }}
      className="border"
    ></input>
  );
};

export default function HomePage() {
  const { data, isLoading } = trpc.useQuery(['questions.get-all-my-questions']);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="p-6 flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Questions</div>
        {data.map((question) => {
          return (
            <Link key={question.id} href={`/question/${question.id}`}>
              <a>
                <div className="my-2">{question.question}</div>
              </a>
            </Link>
          );
        })}
      </div>
      <QuestionCreator />
    </div>
  );
}
