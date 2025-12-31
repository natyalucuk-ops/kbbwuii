import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteConfig {
  [key: string]: any;
}

export const useSiteConfig = (configKey: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      const { data: config, error } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", configKey)
        .maybeSingle();

      if (!error && config) {
        setData(config.value);
      }
      setLoading(false);
    };

    fetchConfig();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`site_config_${configKey}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_config",
          filter: `key=eq.${configKey}`,
        },
        (payload) => {
          if (payload.new && typeof payload.new === "object" && "value" in payload.new) {
            setData(payload.new.value);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [configKey]);

  return { data, loading };
};

export const useTeachers = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: teachers, error } = await supabase
        .from("teachers")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && teachers) {
        setData(teachers);
      }
      setLoading(false);
    };

    fetchData();

    const channel = supabase
      .channel("teachers_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "teachers" },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, loading };
};

export const usePrograms = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: programs, error } = await supabase
        .from("programs")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && programs) {
        setData(programs);
      }
      setLoading(false);
    };

    fetchData();

    const channel = supabase
      .channel("programs_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "programs" },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, loading };
};

export const useFacilities = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: facilities, error } = await supabase
        .from("facilities")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && facilities) {
        setData(facilities);
      }
      setLoading(false);
    };

    fetchData();

    const channel = supabase
      .channel("facilities_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "facilities" },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, loading };
};

export const useTestimonials = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: testimonials, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && testimonials) {
        setData(testimonials);
      }
      setLoading(false);
    };

    fetchData();

    const channel = supabase
      .channel("testimonials_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "testimonials" },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, loading };
};
