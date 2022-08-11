import { prisma } from '../db/client';

export default function HomePage(props: any) {
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
