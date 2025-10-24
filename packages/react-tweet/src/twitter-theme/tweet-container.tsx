import clsx from "clsx";
import type { ReactNode } from "react";
import s from "./tweet-container.module.css";

type Props = { className?: string; children: ReactNode };

export const TweetContainer = ({ className, children }: Props) => (
	<div className={clsx("react-tweet-theme", s.root, className)}>
		<article className={s.article}>{children}</article>
	</div>
);
