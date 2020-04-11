import { QueryResult } from "@apollo/react-common";
import { GetElection, GetElectionVariables } from "./generated/GetElection";
import { ElectionStatus } from "../../generated/globalTypes";

const response: Partial<QueryResult<GetElection, GetElectionVariables>> = {
  loading: false,
  error: undefined,
  data: {
    getElections: {
      elections: [
        {
          id: "04a36ba7-0ea3-4052-a323-873bea0b2b68",
          name: "2019 Democratic Primary",
          description: "for the President of the United States",
          status: "PENDING" as ElectionStatus.PENDING,
          candidates: [
            {
              id: "671f529a-5b88-4cd2-a04e-14367ebdf6b8",
              name: "Tulsi Gabbard",
              description: "U.S. Representative, HI-02",
              __typename: "Candidate"
            },
            {
              id: "ae10cecf-dbf9-44f3-af6c-c4c59347d681",
              name: "John Delaney",
              description: "U.S. Representative, MD-06",
              __typename: "Candidate"
            },
            {
              id: "b28e07bf-bf31-4700-88d3-1f2311523fdd",
              name: "Marianne Williamson",
              description: "Spiritual teacher, author, and activist",
              __typename: "Candidate"
            },
            {
              id: "4a48a080-a8e9-48ca-8dd0-7585b79244a9",
              name: "Wayne Messam",
              description: "Mayor, Miramar FL",
              __typename: "Candidate"
            },
            {
              id: "ae269ae8-cac6-4f8c-9f08-2603200d55fd",
              name: "Julian Castro",
              description: "Secretary of Housing and Urban Development",
              __typename: "Candidate"
            },
            {
              id: "78174cf1-561d-48ee-bb39-94cb364fa5f4",
              name: "John Hickenlooper",
              description: "Governor, CO",
              __typename: "Candidate"
            },
            {
              id: "124c32fa-7377-4646-b8c5-65adf4aee33f",
              name: "Bernie Sanders",
              description: "U.S. Senator, VT",
              __typename: "Candidate"
            },
            {
              id: "b419c228-1a80-4b69-aaed-4f460ff3eb86",
              name: "Beto O'Rourke",
              description: "U.S. Representative, TX-16",
              __typename: "Candidate"
            },
            {
              id: "69c2b256-8857-40e3-8871-d16df6ba73c9",
              name: "Cory Booker",
              description: "U.S. Senator, NJ",
              __typename: "Candidate"
            },
            {
              id: "e3eb6056-7267-4302-89b3-711e7a94626f",
              name: "Pete Buttigieg",
              description: "Mayor, South Bend IN",
              __typename: "Candidate"
            },
            {
              id: "fcd1574a-cfff-4288-adae-332688ae54b3",
              name: "Kamala Harris",
              description: "U.S. Senator, CA",
              __typename: "Candidate"
            },
            {
              id: "0f5dc547-ae1b-42f4-86db-1dcc27fe89c4",
              name: "Jay Inslee",
              description: "Governor, WA",
              __typename: "Candidate"
            },
            {
              id: "83461a38-03d6-45ee-99ca-23580ffdd7f2",
              name: "Elizabeth Warren",
              description: "U.S. Senator, MA",
              __typename: "Candidate"
            },
            {
              id: "e6b7c4bf-3497-48e5-9d9f-b5d950045e01",
              name: "Kristen Gillibrand",
              description: "U.S. Senator, NY",
              __typename: "Candidate"
            },
            {
              id: "d6823aca-54de-4ae4-bf07-b9aa49cf4044",
              name: "Andrew Yang",
              description: "Founder of Venture for America",
              __typename: "Candidate"
            },
            {
              id: "1814c67a-dabb-4323-8257-a022cbc927e9",
              name: "Amy Klobuchar",
              description: "U.S.Senator, MN",
              __typename: "Candidate"
            }
          ],
          __typename: "Election"
        }
      ],
      __typename: "GetElectionsResponse"
    }
  }
};

export default response;
