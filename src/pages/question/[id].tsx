import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

const QuestionsPageContent = (props: { id: string }) => {
  const question = trpc.useQuery(['questions.get-by-id', { id: props.id }]);

  if (!question.isLoading && !question.data) return <div>Question not found</div>;

  return (
    <div className="p-8 flex flex-col">
      <div className="text-2xl font-bold">{question.data?.question}</div>
      <div>
        {(question.data?.options as string[])?.map((option) => (
          <div key={option}>{option}</div>
        ))}
      </div>
    </div>
  );
};

export default function QuestionPage() {
  const router = useRouter();

  if (!router.query.id || typeof router.query.id !== 'string') {
    return <div>No ID</div>;
  }

  return <QuestionsPageContent id={router.query.id} />;
}
