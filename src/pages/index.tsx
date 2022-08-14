import { prisma } from '../db/client';
import { trpc } from '../utils/trpc';

export default function HomePage(props: any) {
  const { data, isLoading } = trpc.useQuery(['hello', { text: 'ryan' }]);

  if (isLoading || !data) return <div>Loading...</div>;

  return <div>{data.greeting}</div>;

  return (
    <div>
      <h1>Hello</h1>
      <code>{props.questions}</code>
    </div>
  );
}

export const getServerSideProps = async () => {
  const questions = await prisma.pollQuestion.findMany();

  return { props: { questions: JSON.stringify(questions) } };
};
