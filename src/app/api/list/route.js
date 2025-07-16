import { NextResponse } from 'next/server';
import { supabase } from '@/util/supabaseClient';    // 경로는 그대로 사용

export async function GET() {
    const { data, error } = await supabase
        .from(`Visitor's Message`)          // 공백·프라임(\') 포함 테이블
        .select('id, name, message, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
