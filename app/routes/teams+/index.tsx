import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { Link } from "lucide-react";
import React from "react";
import { getTeams } from "./teams.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const teams = await getTeams();

  console.log(teams);
  return json({ teams });
}

export default function TeamsRoute() {
  const { teams } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto flex h-full w-ful0l max-w-5xl flex-col justify-center gap-4 p-4">
      <h1 className="text-3xl">Teams</h1>
      <ul className="grid grid-cols-3 gap-4">
        {teams.map((team) => (
          <li className="text-lg border-b border-muted-foreground" key={team}>
            <NavLink to={`/teams/single/${team}`} className="text-body-md flex gap-2">
              <Link />{team}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}