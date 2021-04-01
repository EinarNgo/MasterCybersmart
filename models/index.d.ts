import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Moduler {
  readonly id: string;
  readonly kategori: string;
  readonly type: string;
  readonly sporsmaal: string;
  readonly fasit: string;
  readonly valgmuligheter?: string[];
  readonly vanskelighetsgrad: string;
  readonly antallfeil: number;
  readonly bilder?: string;
  readonly points: number;
  readonly totalSolved: number;
  constructor(init: ModelInit<Moduler>);
  static copyOf(source: Moduler, mutator: (draft: MutableModel<Moduler>) => MutableModel<Moduler> | void): Moduler;
}