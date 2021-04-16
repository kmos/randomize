class Props
{
  text: string;
}

export default function Header({ text }: Props) {
  return <h1 className="title">{text}</h1>
}
